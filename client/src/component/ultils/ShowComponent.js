import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Get_component} from "../../store/actions/components";
import Uploadimg from "./Uploadimg";
import {Button} from "react-bootstrap"
import {Avatar, Chip, IconButton} from "@mui/material";

const ShowComponent = () => {

    const [prev, setpreview] = useState(false)
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.Notification)
    const comp = useSelector((state) => state.Component)
    useEffect(() => {
        if (comp && ! comp.main) {
            dispatch(Get_component())
        }

    })


    return (
        <div className="show_component">
            {
            comp && comp.main ? <>
                <h1>Branches location</h1>
                <div className="Location">


                    {
                    comp && comp.main ? comp.main.filter((e) => e.type === "Location").map((e, i) => {
                        return (
                            <div key={i}>

                                <div className="loc_box">
                                    <img className="com_img"
                                        alt={
                                            e.content
                                        }
                                        src={
                                            e.photo
                                    }></img>
                                    <span>name : {
                                        e.content
                                    }</span>
                                    <div className="loc_box">
                                        <Uploadimg id={
                                            e._id
                                        }/>

                                    </div>
                                </div>
                            </div>
                        )
                    }) : null
                } </div>
                <div className="com_Search">
                    <h1>Background image</h1>
                    {
                    comp && comp.main ? comp.main.filter((e) => e.type === "Searchbar").map((e, i) => {
                        return (
                            <div className="com_Searchs"

                                key={i}>


                                <img className="com_img"
                                    alt={
                                        e.content
                                    }
                                    src={
                                        e.photo
                                }></img>
                                <span>name : {
                                    e.content
                                }</span>
                                <div className="loc_box">
                                    <Uploadimg id={
                                        e._id
                                    }/>

                                </div>

                            </div>
                        )
                    }) : null
                } </div>
              
                  <h1>OUR SPONSORS</h1>
                <div className="Location">


                    {
                    comp && comp.main ? comp.main.filter((e) => e.type === "Sponsor").map((e, i) => {
                        return (
                            <div key={i}>

                                <div className="loc_box">
                                    <Avatar className="com_avater"
                                        alt={
                                            e.content
                                        }
                                        src={
                                            e.photo
                                    }/>
                                    <span>name : {
                                        e.content
                                    }</span>
                                    <div className="loc_box">
                                        <Uploadimg id={
                                            e._id
                                        }/>

                                    </div>
                                </div>
                            </div>
                        )
                    }) : null
                } </div>
                 <div className="com_Search">
                    <h1>About Us</h1>
                    {
                    comp && comp.main ? comp.main.filter((e) => e.type === "About Us").map((e, i) => {
                        return (
                            <div className="com_Searchs"

                                key={i}>


                               
                                <span style={{width:"70%"}}>{
                                    e.content
                                }</span>
                                <div className="loc_box">
                                    <Uploadimg id={
                                        e._id
                                    }/>

                                </div>

                            </div>
                        )
                    }) : null
                } </div>
          
                <div className="com_update"></div>
            </> : <div>No component found</div>
        } </div>
    )
}

export default ShowComponent;
