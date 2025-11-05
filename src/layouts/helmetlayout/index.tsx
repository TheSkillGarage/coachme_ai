
// import { useContext } from "react";
import { Helmet } from "react-helmet"
export type HelmetProps = React.PropsWithChildren &
    React.ComponentPropsWithoutRef<"div"> & {
        charSet?: "utf-8";
        pageTitle?: string;
        description?: string;
    }

function Main(props: HelmetProps) {

    return (
        <div {...props} className="">
            <Helmet>
                <meta charSet={props.charSet} />
                <title>{props.pageTitle}</title>
                <meta name="description" content={props.description} />
            </Helmet>

            {/* <main> */}
            {props.children}
            {/* </main> */}
        </div>
    )

}

export default Main