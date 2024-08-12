export async function action({ request }) {
  const formData = await request.formData();

  const editProfileForm = {
    name: formData.get("name"),
  };
  const errors = {};
  if (editProfileForm.name.length < 1) {
    errors.error = "User must have a name";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  console.log(editProfileForm);
  return null;
}
