import { baseApi } from '../../../app/base.api.js';

export const cvApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCvList: builder.query({
      query: () => 'cv/',
    }),
    getCvById: builder.query({
      query: (cv_id) => `cv/${cv_id}`,
    }),
    updateCv: builder.mutation({
      query: ({ cv_id, body }) => ({ url: `cv/${cv_id}`, method: 'PUT', body }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (draft) => {
              Object.assign(draft, data);
            }),
          );
          dispatch(
            cvApi.util.updateQueryData('getCvList', undefined, (draft) => {
              draft.forEach((cv) => {
                if (cv.id === data.id) {
                  Object.assign(cv, data);
                }
              });
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    //createCV
createCv: builder.mutation({
  query: ({ userId, title, content }) => ({
    url: 'cv/',
    method: 'POST',
    body: { userId, title, content },
  }),
}),
    deleteCv: builder.mutation({
      query: ({ cv_id }) => ({
        url: `cv/${cv_id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', cv_id, () => {
              return null;
            }),
          );
          dispatch(
            cvApi.util.updateQueryData('getCvList', undefined, (draft) => {
              return draft.fulter((cv) => cv.id === cv_id);
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    createHard: builder.mutation({
      query: ({ name, apply_to }) => ({
        url: `hards/`,
        method: 'POST',
        body: { name, apply_to },
      }),
    }),
    getHards: builder.query({
      query: () => 'hards/',
    }),
    addHards: builder.mutation({
      query: ({ cv_id, hard_skills }) => ({
        url: `hards/`,
        method: 'POST',
        body: { hard_skills, cv_id },
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, hard_skill: data };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({ url: `jobs/${id}`, method: 'DELETE' }),
      async onQueryStarted({ cv_id, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, jobs: state.jobs.filter((job) => job.id !== id) };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    addSoft: builder.mutation({
      query: ({ cv_id, skills }) => ({
        url: `softs/`,
        method: 'POST',
        body: { skills, cv_id },
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, soft_skills: data };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    getSofts: builder.query({
      query: () => 'softs/',
    }),
    addConditions: builder.mutation({
      query: ({ cv_id, conditions }) => ({
        url: `conditions/`,
        method: 'POST',
        body: { conditions, cv_id },
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, conditions: data };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    getConditions: builder.query({
      query: () => 'conditions/',
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: `projects/`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, projects: [...state.projects, data] };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    deleteProject: builder.mutation({
      query: (body) => ({
        url: `projects/`,
        method: 'DELETE',
        body,
      }),
      async onQueryStarted({ cv_id, project_id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return {
                ...state,
                projects: state.projects.filter((el) => el.id !== project_id),
              };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    createInstitut: builder.mutation({
      query: (body) => ({
        url: `institut/`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, institutions: [...state.institutions, data] };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    deleteInstitut: builder.mutation({
      query: (body) => ({
        url: `institut/`,
        method: 'DELETE',
        body,
      }),
      async onQueryStarted({ cv_id, institution_id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return {
                ...state,
                institutions: state.institutions.filter((el) => el.id !== institution_id),
              };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    createJob: builder.mutation({
      query: (body) => ({
        url: `jobs/`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ cv_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cvApi.util.updateQueryData('getCvById', +cv_id, (state) => {
              return { ...state, jobs: [...state.jobs, data] };
            }),
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),

    makeAISalary: builder.mutation({
      query: (body) => ({
        url: `ai/salary/`,
        method: 'POST',
        body: { cv: body },
      }),
    }),
    makeAIMark: builder.mutation({
      query: (body) => ({
        url: `ai/mark/`,
        method: 'POST',
        body: { cv: body },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateCvMutation,
  useCreateCvMutation,
  useDeleteCvMutation,
  useCreateHardMutation,
  useGetHardsQuery,
  useGetConditionsQuery,
  useAddSoftMutation,
  useAddConditionsMutation,
  useGetSoftsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useCreateInstitutMutation,
  useDeleteInstitutMutation,
  useCreateJobMutation,
  useGetCvListQuery,
  useGetCvByIdQuery,
  useMakeAISalaryMutation,
  useMakeAIMarkMutation,
  useDeleteJobMutation,
  useAddHardsMutation,
} = cvApi;
