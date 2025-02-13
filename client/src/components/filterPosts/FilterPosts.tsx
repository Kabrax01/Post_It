import styles from "./filterPosts.module.scss";
import { FilterPostProps, FilterType } from "../../entities/types";
import { useEffect, useState } from "react";

const FilterPosts = ({ posts, setFilteredPosts }: FilterPostProps) => {
    const [filterType, setFilterType] = useState<FilterType>("author");
    const [filterDate, setFilterDate] = useState("newest");
    const [filterString, setFilterString] = useState("");

    useEffect(() => {
        const postsCopy = [...posts];

        const sortedPosts = postsCopy.sort((a, b) =>
            filterDate === "newest" ? b.id - a.id : a.id - b.id
        );

        const filteredPosts = sortedPosts.filter((post) =>
            post[filterType].toLowerCase().includes(filterString.toLowerCase())
        );

        setFilteredPosts(filteredPosts);
    }, [filterString, filterType, filterDate, posts, setFilteredPosts]);

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search..."
                value={filterString}
                onChange={(e) => setFilterString(e.target.value)}
            />
            <div className={styles.select_container}>
                <label htmlFor="filter_type">
                    Search by:
                    <select
                        name="posts-filters"
                        id="filter_type"
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value as FilterType)
                        }>
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                    </select>
                </label>
                <label htmlFor="filter_by_date">
                    Date:
                    <select
                        name="posts-filters"
                        id="filter_by_date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default FilterPosts;
