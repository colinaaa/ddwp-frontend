import Taro, { FC, useCallback } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
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
  onlyConfirm?: boolean;
  noTitle?: boolean;
}

const Modal: FC<Props> = ({
  open,
  title,
  onClose,
  onConfirm,
  onCancel,
  children,
  renderBadge,
  onlyConfirm = false,
  noTitle = false,
}) => {
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

  const footer = onlyConfirm ? (
    <View className='modal-footer'>
      <Button className={classNames('confirm', 'confirm-only')} onClick={handleConfirm}>
        确定
      </Button>
    </View>
  ) : (
    <View className='modal-footer'>
      <Button className='modal-footer-button' onClick={handleCancel}>
        取消
      </Button>
      <Button className='confirm' onClick={handleConfirm}>
        确认
      </Button>
    </View>
  );

  return (
    <View className={classNames('modal', { 'modal-active': open })}>
      <View className='modal-overlay' onClick={handleClickOverlay}></View>
      <View
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modal-container'
      >
        {renderBadge && <View className='modal-badge'> {renderBadge} </View>}
        {!noTitle && (
          <View className='modal-header'>
            <Text className='modal-header-title'>{title}</Text>
          </View>
        )}
        <View className='modal-content'>{children}</View>
        {footer}
      </View>
    </View>
  );
};

Modal.defaultProps = {
  open: false,
};

export { Modal };

export default Modal;
