import test from 'node:test';import assert from 'node:assert/strict';
import { filterReleases, isoDuration } from '../src/lib/catalog.ts';
const releases=[{id:'one',title:'Gold',artist:'Adventure Club',collaborators:['SRY4U','Yuna'],genres:['Dubstep'],releaseDate:'2026-09-15',category:'track'},{id:'two',title:'Atonement',artist:'SRY4U',genres:['Dubstep'],releaseDate:'2026-06-17',category:'mix'},{id:'three',title:'Old EP',artist:'SRY4U',genres:[],releaseDate:'2025-12-04',category:'ep'}];
test('search includes collaborator credits and combines genre/year/category filters',()=>{
 assert.deepEqual(filterReleases(releases,{q:' yUnA ',genre:'Dubstep',year:'2026',category:'track'}).map(s=>s.id),['one']);
 assert.deepEqual(filterReleases(releases,{category:'mix'}).map(s=>s.id),['two']);
 assert.equal(filterReleases(releases,{q:'no such track'}).length,0);assert.equal(filterReleases(releases,{}).length,3);
});
test('duration metadata supports hour-long DJ mixes',()=>{assert.equal(isoDuration('59:46'),'PT59M46S');assert.equal(isoDuration('2:10'),'PT2M10S');});
