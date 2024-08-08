import { useContext, useState } from "react";
import type { forumDataType } from "../forum/types/forumData";
import { TailSpin } from "react-loader-spinner";
import { ObjIcon } from "./objIcon";
import { ThemeContext } from "../../../global-contexts/themeContext";

interface searchBoxType {
	displaySearchBox: boolean;
	searchBoxRef?: React.LegacyRef<HTMLDivElement>;
}

export function SearchBox({ displaySearchBox, searchBoxRef }: searchBoxType) {
	const [forums, setForums] = useState([] as forumDataType[]);
	const [loadingSearchResults, setLoadingSearchResults] = useState(true);
	const { enabled } = useContext(ThemeContext);

	return (
		<>
			{displaySearchBox ? (
				<div className="pl-2 flex flex-col h-full" ref={searchBoxRef}>
					{loadingSearchResults ? (
						<div className="self-center flex flex-col m-5 h-full">
							<TailSpin
								height="20"
								width="20"
								color={enabled ? "white" : "black"}
								ariaLabel="tail-spin-loading"
								wrapperClass="load-search"
							/>
						</div>
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
