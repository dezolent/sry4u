import {videos,videoPath,videoThumbnail,videoEmbed,youtubeUrl} from '../data/videos';
import type {Video} from '../data/videos';
import {absolute,artistId} from './structured';
import {isoDuration} from './catalog';

export function videoSchema(video:Video){
 return {
  '@type':'VideoObject','@id':absolute(`${videoPath(video)}#video`),
  name:video.title,description:video.description,url:absolute(videoPath(video)),
  thumbnailUrl:absolute(videoThumbnail(video)),uploadDate:video.uploadDate,
  duration:isoDuration(video.duration),embedUrl:videoEmbed(video),
  creator:{'@id':artistId},publisher:{'@id':artistId},sameAs:youtubeUrl(video),
  mainEntityOfPage:{'@id':absolute(`${videoPath(video)}#page`)},
  ...(video.transcript?{transcript:video.transcript.map(segment=>segment.text).join('\n')}:{}),
 };
}

export const videoCollection={
 '@type':'ItemList','@id':absolute('/videos/#list'),name:'SRY4U videos',
 numberOfItems:videos.length,itemListOrder:'https://schema.org/ItemListOrderDescending',
 itemListElement:videos.map((video,index)=>({
  '@type':'ListItem',position:index+1,name:video.title,url:absolute(videoPath(video)),
  item:{'@id':absolute(`${videoPath(video)}#video`)},
 })),
};
