import PropTypes from 'prop-types';


const ErrorCard = ({ message }) => (
    <div className="card bg-danger text-white mb-3 mt-2 ">
        <div className="card-body">
            <p className="card-text">{message}</p>
        </div>
    </div>
);

ErrorCard.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorCard;
