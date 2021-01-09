import { Button } from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Icon from '@material-ui/core/Icon';


type propTypes = {
  editToggle: Function,
  profileData: {
    stageName: string | null, 
    bio: string | null, 
    genres: Array<string> | null, 
    instruments: Array<string> | null, 
    twitter: string | null,
    instagram: string | null,
    facebook: string | null,
    bandcamp: string | null,
    spotify: string | null,
    youtube: string | null,
    soundcloud: string | null,
    examples: string | null
  },
}

const InfoDisplay = (props: propTypes) => {

  return(
    <div>
      {props.profileData.stageName ? <h3>aka {props.profileData.stageName}</h3> : undefined}
      {props.profileData.bio ? <div>
        <h4>Bio:</h4>
        <p>{props.profileData.bio}</p>
        </div> : undefined}
      {props.profileData.genres ? <div>
        <h4>Genres:</h4>
        {props.profileData.genres.map(genre => <span key={genre}> {genre} </span>)}
        </div> : undefined }
      {props.profileData.instruments ? <div>
        <h4>Instruments: </h4>
        {props.profileData.instruments.map(inst => <span key={inst}> {inst} </span>)}
      </div> : undefined}
      {props.profileData.twitter || props.profileData.instagram || props.profileData.facebook ? 
      <h4>Socials:</h4> : undefined}
      {props.profileData.twitter ?  <a rel="noreferrer" target="_blank" href={`https://twitter.com/${props.profileData.twitter}`}><TwitterIcon /></a> : undefined }
      {props.profileData.instagram ?  <a rel="noreferrer" target="_blank" href={`https://instagram.com/${props.profileData.instagram}`}><InstagramIcon /></a> : undefined }
      {props.profileData.facebook ?  <a rel="noreferrer" target="_blank" href={props.profileData.facebook}><FacebookIcon /></a> : undefined }
      {props.profileData.bandcamp || props.profileData.spotify || props.profileData.youtube || props.profileData.soundcloud ?
      <h4>Listen to Music: </h4> : undefined}
      {props.profileData.bandcamp ? <a rel="noreferrer" target="_blank" href={props.profileData.bandcamp}><Icon className={'fa fa-bandcamp'} /></a> : undefined}
      {props.profileData.spotify ? <a rel="noreferrer" target="_blank" href={props.profileData.spotify}><Icon className={'fa fa-spotify'} /></a> : undefined}
      {props.profileData.youtube ? <a rel="noreferrer" target="_blank" href={props.profileData.youtube}><YouTubeIcon /></a> : undefined}
      {props.profileData.soundcloud ? <a rel="noreferrer" target="_blank" href={props.profileData.soundcloud}><Icon className={'fa fa-soundcloud'} /></a> : undefined}


      {props.profileData.examples !== null ? <h4>Examples:</h4> : undefined }
      
      {props.profileData.examples !== null ? <div className="content" dangerouslySetInnerHTML={{__html: props.profileData.examples}}></div> : undefined }
      
        
      <Button onClick={() => {props.editToggle()}}>Edit Profile</Button>
    </div>
  )

}

export default InfoDisplay;