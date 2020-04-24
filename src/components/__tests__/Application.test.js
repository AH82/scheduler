import React from "react";
import Application from "components/Application";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  getByAltText, 
  getByPlaceholderText, 
  getAllByTestId,
  queryByText,
  queryByAltText,
  prettyDOM
} from "@testing-library/react";


afterEach(cleanup);


describe("Application", () => {
  // @AH82: While Compass ask to delete this test, I kept it for learning purposes. 
  // it("renders without crashing", () => {
  //   render(<Application />);
  // });


  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  
  it ("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { debug, container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    // OR // waitForElementToBeRemoved

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
      // debug();
      // console.log(prettyDOM(day));
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { debug, container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );
    // console.log(prettyDOM(appointment));
  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Mohsen Beih" }
  });
  
  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving...")).toBeInTheDocument();

  // 8. Wait until the element with the text "Mohsen Beih" is displayed.
  await waitForElement(() => queryByText(appointment, "Mohsen Beih"));

  // 9. Check that the DayListItem with the text "Monday" remains with text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    // debug();
    // console.log(prettyDOM(day));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

  

});

// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */