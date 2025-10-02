import { RegisterForm } from "./components/RegisterForm";
import { useOpenFormModal } from "./hooks/useOpenFormModal";
import type { RegisterFormData } from "./types/form";

const ModalFormPage = () => {
  const { isOpenModal, openFormModal, submitFormModal, closeFormModal } =
    useOpenFormModal<RegisterFormData>();

  const handleFormResult = async () => {
    try {
      const result = await openFormModal();
      console.log("form result", result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={handleFormResult}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        📝 신청 폼 작성하기
      </button>
      {isOpenModal && (
        <RegisterForm
          isOpenModal={isOpenModal}
          closeFormModal={closeFormModal}
          submitFormModal={submitFormModal}
        />
      )}
    </div>
  );
};

export default ModalFormPage;
