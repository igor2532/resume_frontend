import { baseApi } from '../../../app/base.api.js';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // auth: builder.mutation({
    //   query: (body) => {
    //     localStorage.removeItem('token');
    //     return {
    //       url: `http://localhost:3306/api/auth/login`,
    //       method: 'POST',
    //       body,
    //       headers: {
    //         Authorization: null,
    //       },
    //     };
    //   },
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data?.auth_token) {
    //         localStorage.setItem('token', data?.auth_token);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   },
    // }),

auth: builder.mutation({
  query: (body) => ({
    url: 'https://my-app-resume-15cfde9edd28.herokuapp.com/api/auth/login',
    method: 'POST',
    body,
  }),
  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (e) {
      console.error('Login error:', e);
    }
  },
}),


    getMe: builder.query({
      query: () => 'auth/me/',
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: 'users/',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'auth/token/logout/',
        method: 'POST',
      }),
      async onQueryStarted(arg, _) {
        localStorage.removeItem('token');
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/users/reset_password/',
        method: 'POST',
        body: data,
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: (data) => ({
        url: 'auth/users/reset_password_confirm/',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: 'auth/users/set_password/',
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'auth/users/me/',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData('getMe', undefined, (draft) => {
              Object.assign(draft, data);
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: 'auth/users/activation/',
        method: 'POST',
        body: data,
      }),
    }),
    resendActivation: builder.mutation({
      query: (data) => ({
        url: 'auth/users/resend_activation/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthMutation, useGetMeQuery, useLogoutUserMutation } = userApi;
