export default function BookingForm({
  handleChange,
  btnText,
  form,
  submit,
  options,
}) {
  return (
    <form
      className="booking-form desktop"
      id="booking-form"
      onSubmit={submit}
      noValidate
    >
      <label className="catway-numbers">
        Pontons
        <select
          name="catwayNumber"
          id="catwayNumber"
          value={form.catwayNumber}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            -- Sélectionner un ponton --
          </option>
          {options.map((option) => {
            return (
              <option key={`catway-${option}`} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
      <fieldset>
        <legend>Infos Client</legend>
        <label>
          Nom du client
          <input
            type="text"
            placeholder="Jean Moulin"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nom du bateau
          <input
            type="text"
            placeholder="Casper"
            name="boatName"
            value={form.boatName}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Dates de séjour</legend>
        <label>
          Date d'entrée
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date départ
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
      <button type="submit">{btnText}</button>
    </form>
  );
}
