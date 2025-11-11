import Dialog from '../../components/ui/dialog'
import Button from '../../components/ui/button/button'
interface SaveDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDiscard: () => void;
}

export default function SaveDialog({ isOpen, onClose, onDiscard }: SaveDialogProps) {
    return (
        <Dialog title="Discard Changes" isOpen={isOpen} onClose={onClose}>
            <p className='text-sm text-grey-300'>
                You have unsaved changes that will be lost if you leave this page. Are you sure you want to discard the changes you made?
            </p>
            <div className="flex justify-end gap-4 mt-6">
                <Button
                    variant="outline"
                    onClick={onDiscard}
                    className='text-grey-500 border-grey-200'
                >
                    Discard Changes
                </Button>
                <Button
                    onClick={() => onClose()}
                >
                    Save Changes
                </Button>

            </div>
        </Dialog>
    )
}
