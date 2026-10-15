import { sortOptions } from "../../assets/utils/utils";

export default function CatwayForm({
  handleChange,
  btnText,
  form,
  submit,
  options,
}) {
  const sortedOptions = sortOptions(options);
  return (
    <div className="catway-form-infos">
      <label className="catway-numbers">
        Pontons déjà existants
        <select name="catway-numbers" id="catway-numbers">
          {sortedOptions.map((option) => {
            return (
              <option key={`catway-${option}`} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
      <form
        className="catway-form"
        id="catway-form"
        onSubmit={submit}
        noValidate
      >
        <label>
          Numéro du ponton
          <input
            type="number"
            name="catwayNumber"
            value={form.catwayNumber}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <fieldset>
          <legend>Longueur</legend>
          <label>
            <input
              type="radio"
              name="catwayType"
              value="short"
              checked={form.catwayType === "short"}
              onChange={handleChange}
              required
            />
            Ponton Court
          </label>
          <label>
            <input
              type="radio"
              name="catwayType"
              value="long"
              checked={form.catwayType === "long"}
              onChange={handleChange}
            />
            Ponton Long
          </label>
        </fieldset>
        <label>
          Description de son état{" "}
          <textarea
            name="catwayState"
            placeholder="ex: bon état"
            value={form.catwayState || "Bon état"}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">{btnText}</button>
      </form>
    </div>
  );
}
