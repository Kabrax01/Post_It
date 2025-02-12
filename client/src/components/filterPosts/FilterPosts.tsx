import styles from "./filterPosts.module.scss";

const FilterPosts = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Search..." />
            <div className={styles.select_container}>
                <label htmlFor="filter_type">Search by:</label>
                <select name="posts-filters" id="filter_type">
                    <option value="date-newest">Author</option>
                    <option value="date-oldest">Title</option>
                </select>
                <label htmlFor="filter_by_date">Date: </label>
                <select name="posts-filters" id="filter_by_date">
                    <option value="date-newest">Newest</option>
                    <option value="date-oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPosts;
