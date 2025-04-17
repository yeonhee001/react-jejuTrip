import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "../../styles/03-community/cmPostPage.scss";
import CmEditPost from "../../component/03-community/post/CmEditPost";
import "../../styles/03-community/_res-community.scss";

function CmEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;

  const postForm = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handlePostUpdate = async (updatedPost) => {
    try {
      const response = await fetch(`http://localhost:4000/post/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error("게시물 수정 실패");

      const data = await response.json();
      alert("게시물이 수정되었습니다.");

      navigate(`/community/cmdetail/${post._id}`, {
        state: { post: updatedPost },
      });
    } catch (error) {
      console.error("게시물 수정 에러:", error);
      alert("게시물 수정에 실패했습니다.");
    }
  };

  return (
    <div style={{ margin: "92px 0 150px" }}>
    <FormProvider {...postForm}>
      <form onSubmit={postForm.handleSubmit(handlePostUpdate)}>
        <CmEditPost postData={post} onSubmit={handlePostUpdate} />
      </form>
    </FormProvider>
    </div>
  );
}

export default CmEditPage;