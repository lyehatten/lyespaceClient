import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


interface PropTypes {
  artistInfo: Array<{firstName: string, lastName: string, profile: {stageName: string | null, genres: Array<string> | null, instruments: Array<string>} | null, id: number}>,
  updateArtistView: Function
}

const ArtistDisplay = (props: PropTypes) => {
  return(
    <div>
      {props.artistInfo.map(artist => {return(
        <div key={artist.id}>
          <h4>{artist.firstName} {artist.lastName} {artist.profile ? artist.profile.stageName ? <h4>aka {artist.profile.stageName}</h4> : 
          undefined : undefined} </h4>
            <p>Genres: </p>
            {artist.profile ? artist.profile.genres ? artist.profile.genres.map(genre => <span key={genre}>{genre}</span>) : 
          <p>Artist has not added genres to profile.</p> : <p>Artist has not added genres to profile.</p>}
            <p>Instruments:   </p>
            {artist.profile ? artist.profile.instruments ? artist.profile.instruments.map(instrument => <span key={instrument}>{instrument}</span>) : 
          <p>Artist has not added instruments to profile.</p> : <p>Artist has not added instruments to profile.</p>}
          <Link to="/artistview"><Button variant="contained" color="primary" onClick={() => {
            props.updateArtistView(artist.id)
          }}>
            View Full Profile
          </Button></Link>
        </div>
      )})}
    </div>
  )
}



export default ArtistDisplay;