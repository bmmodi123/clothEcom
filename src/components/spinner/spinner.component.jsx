import './spinner.styles.scss';

export const spinner = () => {
    return (
        <div className='SpinnerOverlay'>
            <div className='SpinnerContainer'></div>
        </div>
    );
};

export default spinner;