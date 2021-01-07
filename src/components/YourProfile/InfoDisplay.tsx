import { Button } from "@material-ui/core";


type propTypes = {
  editToggle: Function
}


const InfoDisplay = (props: propTypes) => {

  return(
    <div>
      <Button onClick={() => {props.editToggle()}}>Edit Profile</Button>
    </div>
  )

}

export default InfoDisplay;