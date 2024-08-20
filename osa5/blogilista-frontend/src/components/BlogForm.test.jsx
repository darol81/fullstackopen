import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm';
import { vi, afterEach } from 'vitest';

afterEach(() => 
{
    vi.clearAllMocks(); 
});


describe("<Blog/>:", () =>
{
    // Tee uuden blogin luomisesta huolehtivalle lomakkeelle testi, joka varmistaa, 
    // että lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.
    test("submitHandler gets called with correct parameters", async() =>
    {
        const mockHandler = vi.fn();
        render(<BlogForm submitHandler={mockHandler}/>);
              
        /* Kirjoitetaan kenttiin ja testataan */
        const user = userEvent.setup();
        const createButton = screen.getByText("Create");
        await user.type(screen.getByLabelText("Title:"), "Testing with Tom");
        await user.type(screen.getByLabelText("Author:"), "Tom Tester");
        await user.type(screen.getByLabelText("Url:"), "http://www.testingwithtom.com");
        await user.click(createButton);
        expect(mockHandler).toHaveBeenCalledWith("Testing with Tom", "Tom Tester", "http://www.testingwithtom.com");
    });
});




