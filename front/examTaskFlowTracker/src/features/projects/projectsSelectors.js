export const selectProjects = (state) => {
  return state.projects.list;

}
export const selectProjectsStatus = (state) => state.projects.status;

export const selectProjectsError = (state) => state.projects.error;
