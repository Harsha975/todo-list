import React from "react";

function list(props) {
    return (
        <li onClick={()=>{props.onclicked(props.id)}}>{props.item}</li>
    );
}
export default list;