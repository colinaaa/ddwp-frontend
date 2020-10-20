import Taro, { FC, useCallback } from '@tarojs/taro';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import classNames from 'classnames';

import './index.less';

type CallbackT = () => void;

interface Props {
  open: boolean;
  onClose: CallbackT;
  onConfirm?: CallbackT;
  onCancel?: CallbackT;
  title?: string;
  renderBadge?: unknown;
}

const Modal: FC<Props> = ({ open, title, onClose, onConfirm, onCancel, children, renderBadge }) => {
  const handleClickOverlay = () => {
    onClose();
  };

  const handleCancel = useCallback(() => {
    onClose();
    if (onCancel) {
      onCancel();
    }
  }, [onCancel, onClose]);

  const handleConfirm = useCallback(() => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
  }, [onClose, onConfirm]);

  return (
    <View className={classNames('modal', { 'modal-active': open })}>
      <View className='modal-overlay' onClick={handleClickOverlay}></View>
      <View
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modal-container'
      >
        <View className='modal-badge'> {renderBadge} </View>
        <View className='modal-header'>
          <Text className='modal-header-title'>{title}</Text>
        </View>
        <ScrollView scrollY className='modal-content'>
          {children}
        </ScrollView>
        <View className='modal-footer'>
          <Button className='modal-footer-button' onClick={handleCancel}>
            取消
          </Button>
          <Button className='confirm' onClick={handleConfirm}>
            确认
          </Button>
        </View>
      </View>
    </View>
  );
};

export { Modal };

export default Modal;
