"use client";
import Uploader from "@/components/dasbord/uploader";
import Loader from "@/components/shared/landing/Loader";
import { Editing_Types } from "@/constants";
import { getUserProfile } from "@/libs/actions";
import { createNewTask } from "@/libs/actions/task.action";
import { ITask } from "@/models";
import { useStore } from "@/zustand/MainStore";
import {
  Brain,
  Edit3Icon,
  EyeIcon,
  LucideSquareArrowDownLeft,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const TaskPage = () => {
  const { profile, setProfile } = useStore();
  const [taskstae, settaskstae] = useState<boolean>(false);
  const [rawvideo, setrawvideo] = useState<string | null>(null);
  const [prompt, setprompt] = useState<string>("");
  const [editing_type, setediting_type] = useState<string>("Auto Inhance");
  const [loading, setloading] = useState<boolean>(false);
  const [userTasks, setuserTasks] = useState<ITask[]>([]);
  const [taskindex, settaskindex] = useState<number | null>(0);

  // handling from submit
  const hgandleTaskCreate = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // checking if video is not selected

    if (profile?.credit! < 25) {
      return toast.error(
        "Your credit balance is not sufficient, please purchasea a plan."
      );
    }
    if (!rawvideo) {
      return toast.warning("A video is required.");
    }
    // checking if prompt is empty
    if (prompt.length < 3) {
      return toast.warning("Prompt is required.");
    }

    // creating the task

    const payload = {
      rawVid: rawvideo,
      prompt,
      editing_type,
    };
    setloading(true);
    const task_response = await createNewTask(payload);
    setloading(false);
    if (task_response.success) {
      settaskstae(false);
      setrawvideo(null);
      const u = await getUserProfile();
      setProfile(JSON.parse(u));
      return toast.success(task_response.message);
    } else {
      toast.error(task_response.message);
    }
  };

  // side effect
  useEffect(() => {
    if (!profile?.first_name) {
      setloading(true);
      getUserProfile()
        .then((res: any) => {
          setloading(false);
          const user = JSON.parse(res);
          setProfile(user);
          setuserTasks(user.tasks);
        })
        .catch((err: any) => {
          setloading(false);
          toast.error("Unable to fetch profile , please reload the page.");
        });
    } else {
      setuserTasks(profile?.tasks as any);
    }

    return () => {};
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <section className="flex flex-col h-full  rounded-md overflow-hidden lg:items-start items-center">
      {/* back button  */}
      {profile && !taskstae && profile.tasks.length > 0 ? (
        <>
          <span className="text-white text-4xl font-semibold lg:text-start text-center ">
            Your tasks
          </span>

          <div className="flex flex-col w-full gap-2  lg:p-4 md:p-2 p-1 overflow-y-auto max-w-[100%]  items-center ">
            {/* new task button  */}
            <span
              onClick={() => settaskstae(true)}
              className="hover:text-white  self-end text-black  duration-300 transition-all px-5 py-2 rounded-md my-4 hover:bg-gradient-to-tr from-pink-500 to-indigo-500 hover:shadow-lg hover:shadow-pink-500 cursor-pointer bg-white "
            >
              Add task
            </span>
            {/* task toggler  */}
            <div className="w-full text-white font-medium bg-white/20 flex flex-row items-center justify-between border p-2 h-fit rounded-md">
              <span
                onClick={() => settaskindex(0)}
                className={` cursor-pointer xl:px-5 px-2 py-1  ${
                  taskindex === 0 &&
                  "bg-white text-black rounded-lg   shadow-lg  shadow-black"
                }`}
              >
                Queued
              </span>
              <span
                onClick={() => settaskindex(1)}
                className={` cursor-pointer xl:px-5 px-2 py-1  ${
                  taskindex === 1 &&
                  "bg-white text-black rounded-lg shadow-lg shadow-black"
                }`}
              >
                Processing
              </span>
              <span
                onClick={() => settaskindex(2)}
                className={` cursor-pointer xl:px-5 px-2 py-1  ${
                  taskindex === 2 &&
                  "bg-white text-black rounded-lg shadow-lg shadow-black"
                }`}
              >
                Completed
              </span>
            </div>

            {/* latest tasks  */}
            <div className="border-2   flex flex-col items-start flex-grow w-full text-white font-medium rounded-xl p-2">
              <span className="xl:text-3xl text-xl hover:border-b-2 transition-all duration-300 hover:border-b-pink-500 mb-2">
                {taskindex === 0
                  ? " Latest Queued Tasks"
                  : taskindex === 1
                  ? "All processing tasks"
                  : "All completed tasks."}
              </span>

              {/* queued tasks list  */}

              {taskindex === 0 && (
                <>
                  {userTasks
                    .filter((t) => t.status === "queued")
                    .reverse()
                    .map((item: any, index: number) => (
                      // Task card
                      <div
                        key={index}
                        className="bg-glass  flex flex-row items-center justify-between rounded-md my-2 w-full p-2"
                      >
                        {/* task id section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Task Id
                          </span>
                          <span className="text-white line-clamp-1">
                            {item._id.substring(0, 5)}...
                          </span>
                        </div>

                        {/* prompt section  */}
                        <div className="flex flex-col w-1/3 ">
                          <span className="text-white line-clamp-1">
                            Created At:
                          </span>
                          <span className="text-white line-clamp-1">
                            {new Date(item?.createdAt).toDateString()}
                          </span>
                        </div>

                        {/* status section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Status
                          </span>
                          <span className="text-white line-clamp-1">
                            {item.status}
                          </span>
                        </div>

                        {/* View more section  */}

                        <div className="flex flex-col items-center justify-center">
                          <span className="text-white line-clamp-1">
                            Details
                          </span>
                          <Link href={`/dashboard/tasks/${item._id}`}>
                            <EyeIcon className="text-blue-500" size={24} />
                          </Link>
                        </div>
                      </div>
                    ))}
                </>
              )}

              {/* processing tasks list  */}

              {taskindex === 1 && (
                <>
                  {userTasks
                    .filter((t) => t.status === "processing")
                    .reverse()
                    .map((item: any, index: number) => (
                      // Task card
                      <div
                        key={index}
                        className="bg-glass  flex flex-row items-center justify-between rounded-md my-2 w-full p-2"
                      >
                        {/* task id section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Task Id
                          </span>
                          <span className="text-white line-clamp-1">
                            {item._id.substring(0, 5)}...
                          </span>
                        </div>

                        {/* prompt section  */}
                        <div className="flex flex-col w-1/3 ">
                          <span className="text-white line-clamp-1">
                            Created At:
                          </span>
                          <span className="text-white line-clamp-1">
                            {new Date(item?.createdAt).toDateString()}
                          </span>
                        </div>

                        {/* status section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Status
                          </span>
                          <span className="text-white line-clamp-1">
                            {item.status}
                          </span>
                        </div>

                        {/* View more section  */}

                        <div className="flex flex-col items-center justify-center">
                          <span className="text-white line-clamp-1">
                            Details
                          </span>
                          <Link href={`/dashboard/tasks/${item._id}`}>
                            <EyeIcon className="text-blue-500" size={24} />
                          </Link>
                        </div>
                      </div>
                    ))}
                </>
              )}

              {/* processing tasks list  */}

              {taskindex === 2 && (
                <>
                  {userTasks
                    .filter((t) => t.status === "completed")
                    .reverse()
                    .map((item: any, index: number) => (
                      // Task card
                      <div
                        key={index}
                        className="bg-glass  flex flex-row items-center justify-between rounded-md my-2 w-full p-2"
                      >
                        {/* task id section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Task Id
                          </span>
                          <span className="text-white line-clamp-1">
                            {item._id.substring(0, 5)}...
                          </span>
                        </div>

                        {/* prompt section  */}
                        <div className="flex flex-col w-1/3 ">
                          <span className="text-white line-clamp-1">
                            Created At:
                          </span>
                          <span className="text-white line-clamp-1">
                            {new Date(item?.createdAt).toDateString()}
                          </span>
                        </div>

                        {/* status section  */}
                        <div className="flex flex-col w-1/3">
                          <span className="text-white line-clamp-1">
                            Status
                          </span>
                          <span className="text-white line-clamp-1">
                            {item.status}
                          </span>
                        </div>

                        {/* View more section  */}

                        <div className="flex flex-col items-center justify-center">
                          <span className="text-white line-clamp-1">
                            Details
                          </span>
                          <Link href={`/dashboard/tasks/${item._id}`}>
                            <EyeIcon className="text-blue-500" size={24} />
                          </Link>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {taskstae && (
            <span
              onClick={() => {
                setrawvideo(null);
                setprompt("");
                settaskstae(false);
              }}
              className="flex cursor-pointer flex-row transition-all duration-300 hover:text-pink-500 group items-center gap-2 text-white"
            >
              <LucideSquareArrowDownLeft className="text-white group-hover:text-pink-500" />{" "}
              Back
            </span>
          )}
          {taskstae ? (
            <section className="flex w-full md:py-8 py-4 h-full flex-col   items-center justify-center">
              <Uploader setloading={setloading} rawVideoFile={setrawvideo} />

              {/* prompt  */}

              <form
                onSubmit={hgandleTaskCreate}
                className="flex flex-col text-white bg-glass my-4 xl:w-[50%] w-full rounded-md  p-2"
              >
                {/* video editing type  */}
                <label
                  htmlFor="ed_type"
                  className="flex  items-center flex-row gap-2 font-semibold text-lg mb-2"
                >
                  Editing Type <Edit3Icon size={28} />
                </label>

                <select
                  required
                  onChange={(e) => setediting_type(e.target.value)}
                  className="bg-glass p-3 rounded-md my-2"
                  defaultValue={"Auto Inhance"}
                >
                  {Editing_Types &&
                    Editing_Types.map((item, index) => (
                      <option
                        className="bg-black/50 my-2 text-lg  text-black font-medium"
                        key={index}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>

                {/* prompt fro video editing  */}

                <label
                  htmlFor="p"
                  className="text-white flex  items-center flex-row gap-2 font-semibold text-lg mb-4"
                >
                  Describe your thought <Brain color="yellow" size={28} />
                </label>
                <textarea
                  id="p"
                  onChange={(ev) => setprompt(ev.target.value)}
                  className="bg-glass text-white text-xl w-full p-2 rounded-md"
                  placeholder="e.g: enhance this video..."
                ></textarea>

                <button
                  className="hover:text-white text-black font-medium duration-300 transition-all px-5 py-2 rounded-md my-4 hover:bg-gradient-to-tr from-pink-500 to-indigo-500 hover:shadow-lg hover:shadow-pink-500 cursor-pointer bg-white"
                  type="submit"
                >
                  Submit task
                </button>
              </form>
            </section>
          ) : (
            <section className="flex w-full h-full flex-col  border items-center justify-center">
              <span className=" text-4xl font-semibold">Create new task</span>

              <span
                onClick={() => settaskstae(true)}
                className="hover:text-white duration-300 transition-all px-5 py-2 rounded-md my-4 hover:bg-gradient-to-tr from-pink-500 to-indigo-500 hover:shadow-lg text-black hover:shadow-pink-500 cursor-pointer bg-white"
              >
                Add task
              </span>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default TaskPage;
