import isLink from "@utils/isLink"

function Pair({ data, title }) {

	if (typeof data === "string") {
		return <h1>Зараз пара не йде</h1>
	}

	const { name, place, teacherName } = data

	return (
		<div className="pair">
			<h1>{title}</h1>
			<p><strong>{name}</strong>, веде {teacherName}</p>
			{isLink(place)
				? <a href={`${place}`} target="_blank">Підключитися</a>
				: <p>Місце проведення аудиторія <strong>{place}</strong></p>
			}
		</div>
	)

}

export default Pair