import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { CONTACT_PENDING } from '~/constants/contact';
import Metadata from '~/layouts/Metadata';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/contact/${id}`, config);
      if (data.success) {
        toast.success('Xóa liên hệ thành công.');
        navigate('/admin/management/contacts');
        setContacts(
          contacts.filter((item) => {
            return item.id !== id;
          }),
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: 'sequense', headerName: 'STT' },
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'content', headerName: 'Nội dung', flex: 1 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            {cell.value === CONTACT_PENDING ? (
              <div className="text-secondary">{cell.value}</div>
            ) : (
              <div className="text-success">{cell.value}</div>
            )}
          </Fragment>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            <Button variant="contained" component={Link} color="info" to={`/admin/management/contact/${cell.value}`}>
              <ReplyIcon />
            </Button>
            <span style={{ width: '10px' }}> </span>
            <Button
              variant="contained"
              color={'error'}
              onClick={() => {
                handleClickOpenDelete(cell.value);
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${END_POINT}/api/v1/admin/contacts`, { withCredentials: true });
          let contactData = [];

          data.contacts.forEach((contact, index) => {
            contactData.push({
              id: contact._id,
              name: contact.name,
              email: contact.email,
              content: contact.content,
              status: contact.status,
              actions: contact._id,
              sequense: index + 1,
            });
          });
          setContacts(contactData);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const handleRowClick = (params) => {
    setSelectedId(params.row.id);
  };

  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
  };

  const handleClickDelete = () => {
    handleDelete(selectedId);
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Fragment>
      <Metadata title={'Danh sách liên hệ'} />
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xóa liên hệ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Bạn có chắc chắn xóa liên hệ này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy</Button>
          <Button onClick={handleClickDelete} autoFocus color={'error'}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Danh sách liên hệ</h1>
            <OutlineBox>
              <div style={{ height: 700, width: '100%' }} className="p-3">
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rows={contacts}
                  columns={columns}
                  rowsPerPageOptions={[5, 10, 20]}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                  localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                  onRowClick={handleRowClick}
                />
              </div>
            </OutlineBox>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default ContactList;
