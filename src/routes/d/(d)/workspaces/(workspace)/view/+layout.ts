
export const load = async ({ parent, fetch }) => {
    const active_workspaces = await fetch("/api/workspace/all");


}