import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Navbar from "../../../componants/Navbar";
import CenteredContainer from "../../../componants/CenteredContainer";
import {ScrereRecording} from "../../../componants/ScreneRecording";
import LensLab from "../../../componants/LensLab";
import { useEffect, useState } from "react";
import { Button } from '@mantine/core';

export default function Home() {

    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user.isLoggedIn === undefined || user.isLoggedIn === false) {
                router.push("/auth");
            }
            if (user.role === "teacher") {
                setIsTeacher(true);
            }
        } else {
            router.push("/auth");
        }
        
    }, []);


    return (
        <div style={{
            backgroundImage:
            "linear-gradient(135deg, rgba(186, 186, 186, 0.03) 0%, rgba(186, 186, 186, 0.03) 10%,rgba(133, 133, 133, 0.03) 10%, rgba(133, 133, 133, 0.03) 14%,rgba(38, 38, 38, 0.03) 14%, rgba(38, 38, 38, 0.03) 17%,rgba(93, 93, 93, 0.03) 17%, rgba(93, 93, 93, 0.03) 25%,rgba(80, 80, 80, 0.03) 25%, rgba(80, 80, 80, 0.03) 45%,rgba(239, 239, 239, 0.03) 45%, rgba(239, 239, 239, 0.03) 100%),linear-gradient(135deg, rgba(236, 236, 236, 0.03) 0%, rgba(236, 236, 236, 0.03) 47%,rgba(182, 182, 182, 0.03) 47%, rgba(182, 182, 182, 0.03) 63%,rgba(223, 223, 223, 0.03) 63%, rgba(223, 223, 223, 0.03) 81%,rgba(86, 86, 86, 0.03) 81%, rgba(86, 86, 86, 0.03) 89%,rgba(23, 23, 23, 0.03) 89%, rgba(23, 23, 23, 0.03) 90%,rgba(226, 226, 226, 0.03) 90%, rgba(226, 226, 226, 0.03) 100%),linear-gradient(45deg, rgba(52, 52, 52, 0.03) 0%, rgba(52, 52, 52, 0.03) 31%,rgba(246, 246, 246, 0.03) 31%, rgba(246, 246, 246, 0.03) 63%,rgba(188, 188, 188, 0.03) 63%, rgba(188, 188, 188, 0.03) 71%,rgba(15, 15, 15, 0.03) 71%, rgba(15, 15, 15, 0.03) 87%,rgba(127, 127, 127, 0.03) 87%, rgba(127, 127, 127, 0.03) 93%,rgba(234, 234, 234, 0.03) 93%, rgba(234, 234, 234, 0.03) 100%),linear-gradient(90deg, #ffffff,#ffffff)",
        
        }}>
            <Head>
                <title>LabTastic</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <Navbar />
            <div style={{display:"block"}}>
                
            <div>
            {isTeacher && <ScrereRecording></ScrereRecording>}
            </div>
            
            
            <CenteredContainer >
            
                <LensLab />
            
            </CenteredContainer>

            
            <div style={{
                marginTop:"880px",
                marginLeft:"1100px",
                marginBottom:"40px"
            }}>
            
            {!isTeacher && (<Button color="cyan" size="lg">
                Take Quiz
            </Button>)}
        
            </div>
            <div></div>

            </div>
            
        </div>
    );
}