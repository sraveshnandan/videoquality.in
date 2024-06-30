"use client";
import Loader from "@/components/shared/landing/Loader";
import { getUserProfile } from "@/libs/actions";
import { ITask } from "@/models";
import { useStore } from "@/zustand/MainStore";
import { saveAs } from "file-saver";
import { Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const TaskDetailsPage = (props: Props) => {
  const params = useParams();
  const taskId = params.taskId[0];
  const { profile, setProfile } = useStore();

  const [loading, setloading] = useState<boolean>(false);
  const [task, settask] = useState<ITask | null>(null);

  const handleDownload = () => {
    if (!task || !task.finalVideo) {
      return toast.error("something went wrong.");
    }
    return saveAs(task.finalVideo, "VideoQuality_edited_video.mp4");
  };

  useEffect(() => {
    setloading(true);
    getUserProfile()
      .then((res: any) => {
        setloading(false);
        setProfile(JSON.parse(res));
        const p = JSON.parse(res);
        const currentTask = p?.tasks.find(
          (t: any) => t._id.toString() === taskId.toString()
        );

        settask(currentTask as any);
      })
      .catch((err: any) => {
        setloading(false);
        toast.error("Unable to load data.");
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-2">
      <span className="text-xl text-white"> Details of {task?._id}</span>
      <hr />

      {/* task details  */}

      <div className="flex text-xl bg-glass rounded-md shadow-lg  p-4 text-white flex-col gap-2">
        {/* task Id  */}
        <span className="flex  text-xl font-semibold  w-fit mb-2  flex-row items-center gap-2">
          Task ID: <span className="text-gray-500 text-lg">{task?._id}</span>
        </span>
        {/* task prompt  */}
        <span className="flex text-xl font-semibold   w-fit mb-2  flex-row items-center gap-2">
          Prompt:{" "}
          <span className=" text-gray-500 text-lg line-clamp-1">
            {task?.prompt}
          </span>
          <span className="text-white cursor-pointer">
            <Copy />
          </span>
        </span>

        {/* task createdAt data  */}
        <span className="flex text-xl font-semibold   w-fit  flex-row items-center gap-2">
          Created At:{" "}
          <span className="text-gray-500 text-lg">
            {new Date(task?.createdAt).toDateString()}
          </span>
        </span>

        <span className="text-4xl flex flex-row items-center gap-2 mb-4 font-semibold text-white">
          Status: <span className="text-gray-500 text-xl">{task?.status}</span>
        </span>

        {task?.editing_type && (
          <span className="text-4xl flex flex-row items-center gap-2 mb-4 font-semibold text-white">
            Editing Type:{" "}
            <span className="text-gray-500 text-xl">{task?.editing_type}</span>
          </span>
        )}
        {/* Video Section  */}

        <div className="flex lg:flex-row   items-center justify-around  p-2 rounded-md min-h-fit flex-col gap-2">
          {/* Previous Video  */}

          <div className="flex flex-col w-full items-center justify-center lg:w-1/2 min-h-[250px] border p-2 rounded-md gap-2">
            <span className="text-white mb-1 border-b-[2px] text-lg font-semibold">
              Previous Video
            </span>

            <video
              className="w-full h-full"
              src={task?.rawVideo!}
              autoPlay
              muted
              loop={true}
            ></video>
          </div>

          {/* Edited Video  */}
          <div className="flex flex-col w-full lg:w-1/2 border p-2 min-h-[250px] items-center justify-center rounded-md gap-2">
            <span className="text-white border-b-[2px] text-lg font-semibold">
              Edited Video
            </span>

            {task?.finalVideo && task?.finalVideo.length > 0 ? (
              <video
                className="h-full max-h-[270px] w-full"
                src={task?.finalVideo!}
                autoPlay
                muted
              ></video>
            ) : (
              <span className="text-white h-full justify-center flex flex-row items-center gap-2 text-xl">
                {" "}
                your video is in{" "}
                <span className="text-gray-500 text-2xl">{task?.status}</span>
              </span>
            )}
          </div>
        </div>

        {task?.finalVideo ? (
          <>
            <button
              onClick={handleDownload}
              className="transition-all duration-500 text-center hover:bg-purple-500 bg-white text-black hover:text-white lg:w-[60%] mx-auto w-[80%] md:w-[50%] py-3 px-5 rounded-md font-medium my-4"
            >
              Download
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-500 font-medium my-2 text-center">
              Your video will takes up to 5 min to be edited.
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsPage;
