import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarDashboard from "../../components/Navbar";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { ArrowDown2 } from "iconsax-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LockCircle } from "iconsax-react";
import Cookies from "js-cookie";
const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [openChapter, setOpenChapter] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const toggleChapter = (chapterId) => {
    setOpenChapter((prev) => (prev === chapterId ? null : chapterId));
  };
  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/masuk");
      return;
    }
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
          {
            headers: {
              // application: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProfileData(result.user.name);
        console.log(result.user);
        setProfileImage(
          result.user.path_photo ||
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    // Fetch user data to check if the profile is complete

    fetchProfileData();
  }, [navigate]);
  const fetchClassDetail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      setClassDetail(result.data);
      if (!selectedChapter && result.data.chapters?.length > 0) {
        setSelectedChapter(result.data.chapters[0].id);
      }
    } catch (error) {
      console.error("Error fetching class detail:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const markVideoAsWatched = async (videoId) => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/watchedVideo`,
        {
          method: "PUT",  
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_id: videoId,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error marking video as watched:", error);
      throw error;
    }
  };

  const isVideoUnlocked = (chapterIndex, videoIndex) => {
    const chapter = classDetail.chapters[chapterIndex];
    if (videoIndex === 0) {
      return isChapterUnlocked(chapter.id);
    }
    return chapter.videos[videoIndex - 1].is_watched;
  };

  const handleVideoClick = async (videoId, chapterIndex, videoIndex) => {
    if (!isVideoUnlocked(chapterIndex, videoIndex)) {
      toast.error("Selesaikan video sebelumnya terlebih dahulu.");
      return;
    }

    try {
      await markVideoAsWatched(videoId);
      setClassDetail((prevDetail) => {
        if (!prevDetail?.chapters) return prevDetail;
        return {
          ...prevDetail,
          chapters: prevDetail.chapters.map((chapter) => ({
            ...chapter,
            videos: chapter.videos.map((video) => ({
              ...video,
              is_watched: video.id === videoId ? true : video.is_watched,
            })),
          })),
        };
      });
    } catch (error) {
      toast.error("Failed to mark video as watched");
    }
  };

  const handleNextVideo = async () => {
    const currentChapterIndex = classDetail.chapters.findIndex(
      (chapter) => chapter.id === selectedChapter
    );
    const currentChapter = classDetail.chapters[currentChapterIndex];

    if (currentVideoIndex < currentChapter.videos.length - 1) {
      // Move to next video in current chapter
      const nextVideoId = currentChapter.videos[currentVideoIndex + 1].id;
      try {
        await markVideoAsWatched(nextVideoId);
        setCurrentVideoIndex((prev) => prev + 1);

        // Update watched status for current video
        setClassDetail((prevDetail) => ({
          ...prevDetail,
          chapters: prevDetail.chapters.map((chapter) => ({
            ...chapter,
            videos: chapter.videos.map((video) => ({
              ...video,
              is_watched: video.id === nextVideoId ? true : video.is_watched,
            })),
          })),
        }));
      } catch (error) {
        toast.error("Failed to mark video as watched");
      }
    } else {
      // Move to next chapter if available
      if (currentChapterIndex < classDetail.chapters.length - 1) {
        const nextChapter = classDetail.chapters[currentChapterIndex + 1];
        const firstVideoId = nextChapter.videos[0].id;

        try {
          await markVideoAsWatched(firstVideoId);

          // Update watched status and move to next chapter
          setClassDetail((prevDetail) => ({
            ...prevDetail,
            chapters: prevDetail.chapters.map((chapter) => ({
              ...chapter,
              videos: chapter.videos.map((video) => ({
                ...video,
                is_watched: video.id === firstVideoId ? true : video.is_watched,
              })),
            })),
          }));

          setSelectedChapter(nextChapter.id);
          setCurrentVideoIndex(0);
        } catch (error) {
          toast.error("Failed to mark video as watched");
        }
      }
    }
  };
  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prev) => prev - 1);
    } else {
      const currentChapterIndex = classDetail.chapters.findIndex(
        (chapter) => chapter.id === selectedChapter
      );
      if (currentChapterIndex > 0) {
        const prevChapter = classDetail.chapters[currentChapterIndex - 1];
        setSelectedChapter(prevChapter.id);
        setCurrentVideoIndex(prevChapter.videos.length - 1);
      }
    }
  };

  const isChapterUnlocked = (chapterId) => {
    const chapterIndex = classDetail.chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );
    if (chapterIndex === 0) return true;
    const previousChapter = classDetail.chapters[chapterIndex - 1];
    return previousChapter.videos.every((video) => video.is_watched);
  };

  const handleChapterSelect = (chapterId) => {
    if (!isChapterUnlocked(chapterId)) {
      alert("Selesaikan chapter sebelumnya untuk membuka chapter ini.");
      return;
    }
    setSelectedChapter(chapterId);
    setCurrentVideoIndex(0);
  };

  const calculateProgress = () => {
    if (!classDetail?.chapters) return 0;
    const totalVideos = classDetail.chapters.reduce(
      (sum, chapter) => sum + chapter.videos.length,
      0
    );
    const watchedVideos = classDetail.chapters.reduce(
      (sum, chapter) =>
        sum + chapter.videos.filter((video) => video.is_watched).length,
      0
    );
    return Math.round((watchedVideos / totalVideos) * 100);
  };

  const renderSelectedChapterVideos = () => {
    if (!selectedChapter || !classDetail?.chapters) {
      return <p className="text-gray-500">Pilih chapter untuk melihat video</p>;
    }

    const selectedChapterIndex = classDetail.chapters.findIndex(
      (chapter) => chapter.id === selectedChapter
    );
    const selectedChapterData = classDetail.chapters[selectedChapterIndex];

    if (!selectedChapterData?.videos?.length) {
      return (
        <p className="text-gray-500">
          Tidak ada video tersedia untuk chapter ini
        </p>
      );
    }

    const currentVideo = selectedChapterData.videos[currentVideoIndex];

    if (!isVideoUnlocked(selectedChapterIndex, currentVideoIndex)) {
      return (
        <div className="w-full h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-600">
            Selesaikan video sebelumnya untuk membuka video ini
          </p>
        </div>
      );
    }

    return (
      <div className="w-full">
        <iframe
          src={currentVideo.video_url}
          className="w-full rounded-xl h-[500px]"
          title={currentVideo.video_title}
          onLoad={() =>
            handleVideoClick(
              currentVideo.id,
              selectedChapterIndex,
              currentVideoIndex
            )
          }
          allowFullScreen
        />
      </div>
    );
  };

  useEffect(() => {
    fetchClassDetail();
  }, [id]);

  if (isLoading)
    return (
      <div>
        <NavbarDashboard avatar={profileImage} />
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <NavbarDashboard username={profileData} avatar={profileImage} />
        <div className="flex justify-center items-center h-screen text-red-500">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer
        className={"z-50"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
        transition:Bounce
      />
      <NavbarDashboard username={profileData} avatar={profileImage} />
      <div className="mx-auto px-32 py-6 flex items-start md:space-x-6">
        <div className="flex-1">
          <header className="mb-6">
            <h1 className="capitalize text-3xl font-bold text-gray-800">
              {classDetail?.class_name}
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
              <span className="bg-gray-200 px-2 py-1 rounded">
                {classDetail?.level}
              </span>
              <span className="bg-gray-200 px-2 py-1 rounded">
                {classDetail?.category?.category_name}
              </span>
              <span className="bg-gray-200 px-2 py-1 rounded">
                {classDetail?.duration} jam belajar
              </span>
            </div>

            <div className="mt-4 bg-gray-200 rounded-xl h-[500px] flex items-center justify-center">
              {renderSelectedChapterVideos()}
            </div>

            <div className="my-4 flex justify-end space-x-4">
              <Button
                size="small"
                label="Sebelumnya"
                onClick={handlePreviousVideo}
                disabled={
                  currentVideoIndex === 0 &&
                  classDetail?.chapters?.findIndex(
                    (chapter) => chapter.id === selectedChapter
                  ) === 0
                }
              />
              <Button
                size="small"
                label="Selanjutnya"
                onClick={handleNextVideo}
                disabled={
                  currentVideoIndex ===
                    classDetail?.chapters?.find(
                      (chapter) => chapter.id === selectedChapter
                    )?.videos.length -
                      1 &&
                  classDetail?.chapters?.findIndex(
                    (chapter) => chapter.id === selectedChapter
                  ) ===
                    classDetail?.chapters.length - 1
                }
              />
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Mentor
              </h2>
              <div className="flex items-center">
                <img
                  src={classDetail?.mentor?.path_photo}
                  alt={classDetail?.mentor?.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-800">
                    {classDetail?.mentor?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {classDetail?.mentor?.specialist}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Deskripsi
              </h2>
              <p className="text-gray-600">{classDetail?.description}</p>
            </section>
          </header>
        </div>

        <div className="w-full md:w-1/3">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Materi Kelas
            </h2>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="mb-5 space-y-2">
                <p>Progressmu :</p>
                <ProgressBar progress={calculateProgress()} />
              </div>
              <ul className="space-y-4">
                {classDetail?.chapters?.map((chapter, chapterIndex) => (
                  <li key={chapter.id}>
                    <div
                      className="cursor-pointer flex justify-between items-center border-b pb-4"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {chapter.chapter_name}
                      </h3>
                      <span
                        className={`transform ${
                          openChapter === chapter.id ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ArrowDown2 size={20} />
                      </span>
                    </div>
                    {openChapter === chapter.id && (
                      <ul className="mt-2 space-y-2">
                        {chapter.videos?.length > 0 ? (
                          chapter.videos.map((video, index) => (
                            <li
                              key={video.id}
                              className={`flex items-center justify-between text-sm cursor-pointer ${
                                (isChapterUnlocked(chapter.id)
                                  ? "hover:text-blue-600"
                                  : "text-gray-400",
                                selectedChapter === chapter.id &&
                                currentVideoIndex === index
                                  ? "bg-blue-50 p-2 rounded"
                                  : "")
                              }`}
                            >
                              <span
                                className="flex items-center justify-between"
                                onClick={() => {
                                  if (isChapterUnlocked(chapter.id)) {
                                    if (isVideoUnlocked(chapterIndex, index)) {
                                      handleChapterSelect(chapter.id);
                                      setCurrentVideoIndex(index);
                                      handleVideoClick(
                                        video.id,
                                        chapterIndex,
                                        index
                                      );
                                    } else {
                                      toast.error(
                                        "Selesaikan video sebelumnya terlebih dahulu."
                                      );
                                    }
                                  }
                                }}
                              >
                                {video.video_title}{" "}
                              </span>
                              {video.is_watched ? (
                                <span className="text-green-500 font-bold">
                                  ✓
                                </span>
                              ) : (
                                <span className="text-gray-400">
                                  {" "}
                                  <LockCircle
                                    size="20"
                                    color="#808080"
                                    variant="Bulk"
                                  />
                                </span>
                              )}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No videos available
                          </p>
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
