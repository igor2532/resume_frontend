import { baseApi } from '../../../app/base.api.js';

// Define a service using a base URL and expected endpoints
export const specificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessions: builder.query({
      query: (spec) => `professions/?type=${spec}`,
    }),
    professionsCounter: builder.query({
      query: ({ spec, id_prof }) => `professions/?type=${spec}&id=${id_prof}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfessionsQuery, useLazyProfessionsCounterQuery } = specificationApi;
