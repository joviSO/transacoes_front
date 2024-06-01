import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';

Modal.setAppElement('#root');

const LogoutModal = ({ navigate }) => {
    const { setToken, setUser, showLogoutModal, setShowLogoutModal } = useAuth();

    const handleConfirm = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setToken(null);
        setUser(null);
        setShowLogoutModal(false);
        navigate('/');
    };

    const handleCancel = () => {
        setShowLogoutModal(false);
    };

    if (!showLogoutModal) {
        return null;
    }

    return (
      <Modal isOpen={showLogoutModal} onRequestClose={handleCancel}>
        <p>Tem certeza de que deseja sair?</p><br/>
        <div className="modal-buttons">
          <button className="leave" onClick={handleConfirm}>Sim</button>
          <button className="stay" onClick={handleCancel}>Não</button>
        </div>
      </Modal>
);
};

export default LogoutModal;