/** Both URL forms resolve; page metadata and navigation use one canonical path. */
export function canonicalPagePath(pathname:string):string {
 if(pathname.endsWith('/')||/\.[^/]+$/.test(pathname))return pathname;
 return `${pathname}/`;
}
