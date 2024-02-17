import styled from "@emotion/styled";
import * as RUAlertDialog from '@radix-ui/react-alert-dialog';

import {Button} from "./Button";

const StyledOverlay = styled(RUAlertDialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const StyledContent = styled(RUAlertDialog.Content)`
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  
    &:focus {
        outline: none;
    } 

    
`;

const StyledAlertDialog = styled(RUAlertDialog.Root)`

  background: red;
  
  &.AlertDialogOverlay {
    background-color: var(--black-a9);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.AlertDialogContent {
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &.AlertDialogContent:focus {
    outline: none;
  }

  &.AlertDialogTitle {
    margin: 0;
    color: var(--mauve-12);
    font-size: 17px;
    font-weight: 500;
  }

  &.AlertDialogDescription {
    margin-bottom: 20px;
    color: var(--mauve-11);
    font-size: 15px;
    line-height: 1.5;
  }
    
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

type AlertDialogProps = {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}
export function AlertDialog({open, title, onCancel, onConfirm}: AlertDialogProps) {
  return (
    <StyledAlertDialog open={open}>
      <RUAlertDialog.Portal>
        <StyledOverlay className="AlertDialogOverlay" />
        <StyledContent className="AlertDialogContent">
          <RUAlertDialog.Title className="AlertDialogTitle">{title}</RUAlertDialog.Title>
          <RUAlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone.
          </RUAlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <RUAlertDialog.Cancel asChild>
              <Button $variant={'neutral'} className="Button" onClick={() => onCancel()}>Cancel</Button>
            </RUAlertDialog.Cancel>
            <RUAlertDialog.Action asChild>
              <Button $variant={'danger'} className="Button"  onClick={() => onConfirm()}>Delete</Button>
            </RUAlertDialog.Action>
          </div>
        </StyledContent>
      </RUAlertDialog.Portal>
    </StyledAlertDialog>
  )
}
