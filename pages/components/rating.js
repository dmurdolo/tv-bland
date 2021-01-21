import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas)
library.add(far)

import styles from '../../styles/Rating.module.scss'

function Rating(props) {
    const convertRatingOutOfFive = (average) => {
        return average / 2;
    }

    const rating = convertRatingOutOfFive(props.average);

    return (
        <div className={`${styles.rating}`}>
            <span className={styles.stars}>
                <FontAwesomeIcon icon={[`${rating >= 1 ? 'fas' : 'far'}`, "star"]} />
                <FontAwesomeIcon icon={[`${rating >= 2 ? 'fas' : 'far'}`, "star"]} />
                <FontAwesomeIcon icon={[`${rating >= 3 ? 'fas' : 'far'}`, "star"]} />
                <FontAwesomeIcon icon={[`${rating >= 4 ? 'fas' : 'far'}`, "star"]} />
                <FontAwesomeIcon icon={[`${rating == 5 ? 'fas' : 'far'}`, "star"]} />
            </span>
            {props.page != 'home' && <span>{rating} / 5</span>}
        </div>
    );
}

export default Rating