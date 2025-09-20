import { Modal } from "./common/Modal";
import { FormInput } from "./common/FormInput";
import { FormSelect } from "./common/FormSelect";
import { Button } from "./common/Button";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import type { RegisterFormData } from "../types/form";

interface Props {
  closeFormModal: () => void;
  submitFormModal: (formValue: RegisterFormData) => void;
}

export const RegisterForm = ({ submitFormModal, closeFormModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();

  const errorMessageRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: RegisterFormData) => {
    submitFormModal(data);
    reset();
    closeFormModal();
  };

  // 오류가 발생했을 때 스크린리더에게 알림
  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorMessageRef.current) {
      const errorCount = Object.keys(errors).length;
      errorMessageRef.current.textContent = `${errorCount}개의 오류가 있습니다. 폼을 확인해주세요.`;
    } else if (errorMessageRef.current) {
      errorMessageRef.current.textContent = "";
    }
  }, [errors]);

  return (
    <Modal
      title="신청 폼"
      description="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요."
      onClose={closeFormModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="이름 / 닉네임"
          type="text"
          error={errors.name}
          required
          {...register("name", {
            required: "이름을 입력해주세요",
          })}
        />

        <FormInput
          label="이메일"
          type="email"
          error={errors.email}
          required
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 형식을 입력해주세요",
            },
          })}
        />

        <FormSelect
          label="FE 경력 연차"
          error={errors.experience}
          required
          {...register("experience", {
            required: "경력 연차를 선택해주세요",
          })}
        >
          <option value="">선택해주세요</option>
          <option value="0~3년">0~3년</option>
          <option value="4~7년">4~7년</option>
          <option value="8~9년">8~9년</option>
          <option value="10년 이상">10년 이상</option>
        </FormSelect>

        <FormInput
          label="GitHub 주소"
          type="url"
          placeholder="https://github.com/username"
          error={errors.github}
          {...register("github")}
        />

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={closeFormModal}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            제출
          </Button>
        </div>
      </form>
    </Modal>
  );
};
