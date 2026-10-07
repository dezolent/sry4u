export interface FilterableRelease {id:string;title:string;artist?:string;collaborators?:string[];features?:string[];genres:string[];releaseDate:string;category:string;}
export interface ReleaseFilters {q?:string;genre?:string;year?:string;category?:string;}
export function filterReleases<T extends FilterableRelease>(releases:T[],filters:ReleaseFilters):T[]{
 const q=(filters.q||'').trim().toLocaleLowerCase();
 return releases.filter(r=>(!q||[r.title,r.artist,...r.collaborators||[],...r.features||[]].join(' ').toLocaleLowerCase().includes(q))&&(!filters.genre||r.genres.includes(filters.genre))&&(!filters.year||r.releaseDate.startsWith(filters.year))&&(!filters.category||r.category===filters.category));
}
export function isoDuration(duration:string):string{const [m,s]=duration.split(':').map(Number);return `PT${m}M${s}S`;}
export function formatDate(date:string):string{return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}
