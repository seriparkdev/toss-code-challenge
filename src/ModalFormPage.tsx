import type { RegisterFormData } from "./types/form";
import { Button } from "./components/common/Button";
import { useModalContext } from "./contexts/ModalContext";
import Form from "./components/common/Form";
import Modal from "./components/common/Modal";
import { useForm } from "react-hook-form";

const ModalFormPage = () => {
  const { openFormModal, closeFormModal, submitFormModal } =
    useModalContext<RegisterFormData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const handleFormResult = async () => {
    try {
      const result = await openFormModal();
      alert(
        `이메일: ${result?.email}\n 이름:${result?.name}\n GitHub: ${result?.github}\n 경력: ${result?.experience}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    submitFormModal(data);
    closeFormModal();
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Button onClick={handleFormResult}>📝 신청 폼 작성하기</Button>

      <Modal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>신청 폼</Modal.Header>
          <Modal.Description>
            이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
          </Modal.Description>
          <Form.InputField
            label="이름 / 닉네임"
            type="text"
            error={errors.name?.message}
            {...register("name", {
              required: "이름을 입력해주세요.",
            })}
          />
          <Form.InputField
            label="이메일"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          <Form.InputField
            label="GitHub 주소"
            type="url"
            placeholder="https://github.com/username"
            error={errors.github?.message}
            {...register("github", {
              pattern: {
                value: /^https?:\/\/(www\.)?github\.com\/.+/,
                message: "올바른 GitHub URL 형식이 아닙니다.",
              },
            })}
          />
          <Form.Footer>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={closeFormModal}
            >
              취소
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              제출
            </Button>
          </Form.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalFormPage;
