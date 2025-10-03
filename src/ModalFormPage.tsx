import type { RegisterFormData } from "./types/form";
import { Button } from "./components/common/Button";
import Modal from "./components/common/Modal";
import { useModalContext } from "./contexts/ModalContext";

const ModalFormPage = () => {
  const { openFormModal, closeFormModal } = useModalContext<RegisterFormData>();

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
      <Button onClick={handleFormResult}>📝 신청 폼 작성하기</Button>
      <Modal>
        <Modal.Header>신청 폼</Modal.Header>
        <Modal.Description>
          이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.
        </Modal.Description>

        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalFormPage;
