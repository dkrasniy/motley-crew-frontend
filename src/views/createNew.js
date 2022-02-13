function CreateNew() {
  return (
    <div className="max-w-lg mx-auto">
      <h1>Create New Folder</h1>
      <form className="mt-6">
        <label htmlFor="folderName" className="text-left block text-sm font-medium text-gray-700">
          Folder Name
        </label>

        <input
          id="folderName"
          name="folderName"
          type="folderName"
          autoComplete="folderName"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </form>
    </div>
  );
}

export default CreateNew;
