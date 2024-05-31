import { ExpandLess, ExpandMore, Tune } from '@mui/icons-material';
import {
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../redux/services/category';
import { Category } from '../../../types/category';
import { LocalizedString } from '../../../types/common';

const drawerWidth = 280;

interface TreeNode {
  id: string;
  name: LocalizedString;
  children: TreeNode[];
}

function buildTree(categories: Category[]): TreeNode[] {
  const categoryMap: { [id: string]: TreeNode } = {};
  const rootNodes: TreeNode[] = [];

  categories.forEach((category) => {
    categoryMap[category.id] = {
      id: category.id,
      name: category.name,
      children: [],
    };
  });

  categories.forEach((category) => {
    if (category.parent) {
      const parentNode = categoryMap[category.parent.id];
      parentNode.children.push(categoryMap[category.id]);
    } else {
      rootNodes.push(categoryMap[category.id]);
    }
  });

  return rootNodes;
}

const Categories = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetCategoriesQuery();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpenDrawer(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpenDrawer(!openDrawer);
    }
  };

  const tree = data ? buildTree(data.results) : [];

  const SidebarMenuItem = ({ node }: { node: TreeNode }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleNavigate = () => {
      navigate(`/catalog/${node.id}`);
      setOpenDrawer(false);
    };

    if (node.children.length === 0) {
      return (
        <ListItemButton key={node.id} sx={{ pl: 4 }} onClick={handleNavigate}>
          <ListItemText primary={node.name['en-US']} />
        </ListItemButton>
      );
    } else {
      return (
        <>
          <ListItemButton sx={{ pl: 3 }} onClick={handleNavigate}>
            <ListItemText primary={node.name['en-US']} />
            <IconButton
              edge='end'
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {node.children.map((child) => (
                <SidebarMenuItem key={child.id} node={child} />
              ))}
            </List>
          </Collapse>
        </>
      );
    }
  };

  const SidebarMenu = (
    <Stack>
      <Typography variant='h6' sx={{ p: 2 }}>
        Categories
      </Typography>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component='nav'>
        {tree.map((node) => (
          <SidebarMenuItem key={node.id} node={node} />
        ))}
      </List>
    </Stack>
  );

  return (
    <>
      <Button color='inherit' variant='text' endIcon={<Tune />} onClick={handleDrawerToggle}>
        Categories
      </Button>
      <Drawer
        anchor='right'
        open={openDrawer}
        variant='temporary'
        onClose={handleDrawerClose}
        onTransitionEnd={handleDrawerTransitionEnd}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {!isLoading || !isFetching ? (
          SidebarMenu
        ) : (
          <List>
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItemButton key={index} sx={{ pl: 3 }}>
                <ListItemText primary='Loading...' />
              </ListItemButton>
            ))}
          </List>
        )}
      </Drawer>
    </>
  );
};

export default Categories;
