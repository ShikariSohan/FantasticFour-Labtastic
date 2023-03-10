import Head from "next/head";
import Navbar from "../../componants/Navbar";
import { Button, Text } from "@mantine/core";
import NewCourseModal from "../../componants/NewCourseModal";
import { useEffect, useState } from "react";
import StreamStudent from "../../componants/StreamStudent";
import axios from "axios";
import { useRouter } from "next/router";
import CodeModal from "../../componants/CodeModal";
import LabSelectModal from "../../componants/LabSelectModal";
import VideoUploadModal from "../../componants/VideoUploadModal";
import StudentTable from "../../componants/StudentInfo";
export default function Home(props) {
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

  const router = useRouter();
  const { id } = router.query;
  const [labDemo, setLabDemo] = useState(false);
  const [course, setCourse] = useState({
    code: "",
    name: "",
    subject: "",
    session: "",
  });
  const [stream, setStream] = useState([]);
  const [show, setShow] = useState(true);
  const [students, setStudens] = useState([]);

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
  useEffect(() => {
    if (id) {
      axios.get(`/api/courses/${id}`).then((res) => {
        setCourse({ ...res.data.classroom });
        setStream(res.data.stream);
        setStudens(res.data.students);
        console.log(res.data);
      });
    }
  }, [id]);

  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(135deg, rgba(186, 186, 186, 0.03) 0%, rgba(186, 186, 186, 0.03) 10%,rgba(133, 133, 133, 0.03) 10%, rgba(133, 133, 133, 0.03) 14%,rgba(38, 38, 38, 0.03) 14%, rgba(38, 38, 38, 0.03) 17%,rgba(93, 93, 93, 0.03) 17%, rgba(93, 93, 93, 0.03) 25%,rgba(80, 80, 80, 0.03) 25%, rgba(80, 80, 80, 0.03) 45%,rgba(239, 239, 239, 0.03) 45%, rgba(239, 239, 239, 0.03) 100%),linear-gradient(135deg, rgba(236, 236, 236, 0.03) 0%, rgba(236, 236, 236, 0.03) 47%,rgba(182, 182, 182, 0.03) 47%, rgba(182, 182, 182, 0.03) 63%,rgba(223, 223, 223, 0.03) 63%, rgba(223, 223, 223, 0.03) 81%,rgba(86, 86, 86, 0.03) 81%, rgba(86, 86, 86, 0.03) 89%,rgba(23, 23, 23, 0.03) 89%, rgba(23, 23, 23, 0.03) 90%,rgba(226, 226, 226, 0.03) 90%, rgba(226, 226, 226, 0.03) 100%),linear-gradient(45deg, rgba(52, 52, 52, 0.03) 0%, rgba(52, 52, 52, 0.03) 31%,rgba(246, 246, 246, 0.03) 31%, rgba(246, 246, 246, 0.03) 63%,rgba(188, 188, 188, 0.03) 63%, rgba(188, 188, 188, 0.03) 71%,rgba(15, 15, 15, 0.03) 71%, rgba(15, 15, 15, 0.03) 87%,rgba(127, 127, 127, 0.03) 87%, rgba(127, 127, 127, 0.03) 93%,rgba(234, 234, 234, 0.03) 93%, rgba(234, 234, 234, 0.03) 100%),linear-gradient(90deg, #ffffff,#ffffff)",
      }}
    >
      <Head>
        <title>LabTastic</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Navbar />

      <div
        style={{
          marginLeft: 200,
          borderRadius: "15px",
          backgroundColor: "rgba(204, 237, 255, 0.4)",
          padding: "20px",
          width: "30%",
        }}
      >
        <Text size="xl">{course.name}</Text>
        <Text size="lg">{course.subject}</Text>
        <Text size="md">{course.session}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant="gradient"
          size="xl"
          gradient={{ from: "teal", to: "blue" }}
          onClick={() => {
            setLabDemo(true);
          }}
        >
          Demonstate a lab
        </Button>
      </div>

      <LabSelectModal
        opened={labDemo}
        setOpened={setLabDemo}
        subject={course.subject}
      />

      {show == true &&
        stream.length > 0 &&
        stream.map((stream) => (
          <div style={{ marginTop: "10px" }}>
            <StreamStudent stream={stream} />
          </div>
        ))}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   //   const data = await axios.get("http://localhost:3000/api/courses", {
//   //     headers: {
//   //       authToken: `${context.req.cookies.authToken}`,
//   //     },
//   //   });
//   //   console.log(data.data);
//   //   return {
//   //     props: {
//   //       courses: data.data.data,
//   //     },
//   //   };
// }
