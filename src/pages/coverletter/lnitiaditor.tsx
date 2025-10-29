import GradientLoader from '../../components/circularprogress'
import { Card } from '../../components/ui/card'
import { FileText } from 'lucide-react'
interface LoadProp {
    loading: boolean
}
export default function Initiaditor(props: LoadProp) {

    return (
        <Card hoverable={false} className='flex px-10 flex-col justify-center items-center bg-grey-50 shadow-none border-none rounded-lg  w-full lg:min-h-[80vh] sm:min-h-40'>
            {props?.loading ? <GradientLoader /> : <>
                <FileText size={30} className='h-30 w-40 text-grey-400' />
                <h1 className='text-sm font-medium text-grey-500'>Your cover letter will appear here </h1>
                <p className='text-grey-300 text-sm text-center'>
                    Stand out from the competition and increase your chance s of landing interviews
                </p>
            </>}
        </Card>
    )
}
