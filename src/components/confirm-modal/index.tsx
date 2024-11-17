import React from "react";
import { Modal } from "antd";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
}

function ConfirmModal({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
  okText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  );
}

export default ConfirmModal;
