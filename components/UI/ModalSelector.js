import React from "react";
import ModalComponent from "../UI/ModalComponent";

export default function ModalSelector({visible, data, title, onClose, onSelect}) {
    return (<ModalComponent
        visible={visible}
        data={data}
        modalTitle={title}
        onClose={onClose}
        onItemClick={onSelect}
    />);
}
