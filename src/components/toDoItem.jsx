import React from "react";


function ShowListItem(props) {

    return <div onClick = {() => {
        return props.onChecked(props.id)
    }}>
    <li>{props.item}</li></div> 
}
export default ShowListItem;