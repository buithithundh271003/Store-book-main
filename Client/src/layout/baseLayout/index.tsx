import React from "react";

type Props = {
    children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
    // return <div>

    //     {children}
    // </div>;
    return <div>
        {children}
    </div>;
};

export default BaseLayout;
