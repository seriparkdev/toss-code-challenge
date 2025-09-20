import { Modal } from "./common/Modal";
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
    <Modal title="신청 폼" onClose={closeFormModal}>
      <p className="text-sm mb-2 ">
        이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이름 / 닉네임
          </label>
          <input
            type="text"
            id="name"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            FE 경력 연차
          </label>
          <select
            id="experience"
            aria-describedby={
              errors.experience ? "experience-error" : undefined
            }
            aria-invalid={errors.experience ? "true" : "false"}
            {...register("experience", {
              required: "경력 연차를 선택해주세요",
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">선택해주세요</option>
            <option value="0~3년">0~3년</option>
            <option value="4~7년">4~7년</option>
            <option value="8~9년">8~9년</option>
            <option value="10년 이상">10년 이상</option>
          </select>
          {errors.experience && (
            <p
              id="experience-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.experience.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="github"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHub 주소
          </label>
          <input
            type="url"
            id="github"
            placeholder="https://github.com/username"
            aria-describedby={errors.github ? "github-error" : undefined}
            aria-invalid={errors.github ? "true" : "false"}
            {...register("github")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.github ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.github && (
            <p
              id="github-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.github.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={closeFormModal}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            제출
          </button>
        </div>
      </form>
    </Modal>
  );
};
