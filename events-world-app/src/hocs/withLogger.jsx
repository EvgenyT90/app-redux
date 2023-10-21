import React, { useEffect } from "react";

const withLogger = (WrappedComponent) => {
    const WithLogger = (props) => {
        useEffect(() => {
            // Логгирование когда компонент примонтировался
            console.log(`Компонент ${WrappedComponent.name} примонтировался`);

            return () => {
                //Логирование компонента при размонтировании
                console.log(
                    `Компонент ${WrappedComponent.name} размонтировался`,
                );
            };
        }, []);

        useEffect(() => {
            //Логирование компонента при обновлении
            console.log(`Компонент ${WrappedComponent.name} обновился`);
        });

        return <WrappedComponent {...props} />;
    };

    WithLogger.displayName = `withLogger(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return WithLogger;
};

export default withLogger;
