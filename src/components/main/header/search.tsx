import { useState } from "react";
import type { forumDataType } from "../forum/types/forumData";
import { TailSpin } from "react-loader-spinner";
import { ObjIcon } from "./objIcon";

interface searchBoxType {
	displaySearchBox: boolean;
	searchBoxRef?: React.LegacyRef<HTMLDivElement>;
}

export function SearchBox({ displaySearchBox, searchBoxRef }: searchBoxType) {
	const [forums, setForums] = useState([] as forumDataType[]);
	const [loadingSearchResults, setLoadingSearchResults] = useState(true);

	return (
		<>
			{displaySearchBox ? (
				<div className="search-box popover" ref={searchBoxRef}>
					{loadingSearchResults ? (
						<TailSpin
							height="20"
							width="20"
							color="white"
							ariaLabel="tail-spin-loading"
							wrapperClass="load-search"
						/>
					) : (
						<>
							<div className="users-search-section search-section">
								<h5>Forums</h5>
								<div className="results">
									{forums.length > 0 ? (
										forums.map((forum) => {
											return <ObjIcon obj={forum} key={forum.title} />;
										})
									) : (
										<div className="no-results">No Results</div>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			) : undefined}
		</>
	);
}
