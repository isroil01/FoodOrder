import { Fragment } from 'react';
import ReactDom from 'react-dom';
import style from './Model.module.css';

const BackDrop = props =>{
    return <div className={style.backdrop} onClick={props.onClose}></div>
};

const ModalOverLay = props =>{
    return<div className={style.modal}>
        <div className={style.content}>{props.children}</div>
    </div>
};
const prostal =  document.getElementById('overlays')

const Modal = props =>{
  return <Fragment>
      {ReactDom.createPortal(<BackDrop onClose={props.onClose}/>,prostal)}
      {ReactDom.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,prostal)}
  </Fragment>
};

export default Modal;
