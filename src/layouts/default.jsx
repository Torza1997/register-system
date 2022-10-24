const { Navabar } = require('../components/other/navbar');
export function LayoutDefault({ children }) {
    return (
        <div>
            <Navabar />
            {children}
        </div>
    )
}